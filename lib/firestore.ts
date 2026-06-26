import { db } from './firebase'
import {
  doc, getDoc, setDoc, updateDoc, collection,
  getDocs, onSnapshot, serverTimestamp, query, where, orderBy,
} from 'firebase/firestore'

// ── Types ──────────────────────────────────────────────

export type UserProfile = {
  budget: string; downPmt: string; credit: string;
  dti: string; location: string; timeline: string;
  // Filled in later by the backend agents — absent until then.
  preApproval?: string; trueBudget?: string; homesWatched?: number;
}

export type Phase = {
  num: number; name: string; status: string;
  state: 'done' | 'active' | 'upcoming';
}

export type PhaseData = {
  currentPhase: number
  phases: Phase[]
}

export type Action = {
  id: string; title: string; description: string;
  phase: number; completed: boolean; urgency: string | null;
}

export type Insight = {
  id: string; message: string; phase: number;
  read: boolean; createdAt: Date;
}

// ── User Profile ────────────────────────────────────────

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const ref = doc(db, 'gavnest/agent/users', uid, 'profile', 'data')
  const snap = await getDoc(ref)
  return snap.exists() ? (snap.data() as UserProfile) : null
}

export async function setUserProfile(uid: string, profile: UserProfile): Promise<void> {
  const ref = doc(db, 'gavnest/agent/users', uid, 'profile', 'data')
  await setDoc(ref, { ...profile, createdAt: serverTimestamp() })
}

export function hasUserProfile(uid: string): Promise<boolean> {
  return getUserProfile(uid).then((p) => p !== null)
}

// ── Phase Data ──────────────────────────────────────────

export async function getPhaseData(uid: string): Promise<PhaseData> {
  const ref = doc(db, 'gavnest/agent/users', uid, 'phases', 'data')
  const snap = await getDoc(ref)
  if (snap.exists()) return snap.data() as PhaseData

  // Default phase data for new users
  const defaultData: PhaseData = {
    currentPhase: 1,
    phases: [
      { num: 1, name: 'Am I ready?', status: 'In progress', state: 'active' },
      { num: 2, name: 'Get pre-approved', status: 'Upcoming', state: 'upcoming' },
      { num: 3, name: 'Search & evaluate', status: 'Upcoming', state: 'upcoming' },
      { num: 4, name: 'Make an offer', status: 'Upcoming', state: 'upcoming' },
      { num: 5, name: 'Under contract', status: 'Upcoming', state: 'upcoming' },
      { num: 6, name: 'Close & move in', status: 'Upcoming', state: 'upcoming' },
    ],
  }
  await setDoc(ref, defaultData)
  return defaultData
}

export async function advancePhase(uid: string, currentPhase: number): Promise<void> {
  if (currentPhase >= 6) return
  const ref = doc(db, 'gavnest/agent/users', uid, 'phases', 'data')
  const data = await getPhaseData(uid)
  const updated = data.phases.map((p) => {
    if (p.num === currentPhase) return { ...p, status: 'Completed', state: 'done' as const }
    if (p.num === currentPhase + 1) return { ...p, status: 'In progress', state: 'active' as const }
    return p
  })
  await updateDoc(ref, { currentPhase: currentPhase + 1, phases: updated })
}

// ── Actions ─────────────────────────────────────────────

export async function getActions(uid: string, phase: number): Promise<Action[]> {
  const ref = collection(db, 'gavnest/agent/users', uid, 'actions')
  const q = query(ref, where('phase', '==', phase), orderBy('createdAt'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Action)
}

export async function toggleAction(uid: string, actionId: string, completed: boolean): Promise<void> {
  const ref = doc(db, 'gavnest/agent/users', uid, 'actions', actionId)
  await updateDoc(ref, { completed })
}

// Subscribe to actions in real time (use this in the dashboard component)
export function subscribeToActions(
  uid: string,
  phase: number,
  callback: (actions: Action[]) => void
): () => void {
  const ref = collection(db, 'gavnest/agent/users', uid, 'actions')
  const q = query(ref, where('phase', '==', phase), orderBy('createdAt'))
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Action))
  })
}

// ── Insights ────────────────────────────────────────────

export async function getLatestInsight(uid: string, phase: number): Promise<Insight | null> {
  const ref = collection(db, 'gavnest/agent/users', uid, 'insights')
  const q = query(ref, where('phase', '==', phase), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  if (snap.empty) return null
  const d = snap.docs[0]
  return { id: d.id, ...d.data(), createdAt: d.data().createdAt?.toDate() } as Insight
}

// Subscribe to latest insight in real time (use this in dashboard)
export function subscribeToLatestInsight(
  uid: string,
  phase: number,
  callback: (insight: Insight | null) => void
): () => void {
  const ref = collection(db, 'gavnest/agent/users', uid, 'insights')
  const q = query(ref, where('phase', '==', phase), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snap) => {
    if (snap.empty) {
      callback(null)
      return
    }
    const d = snap.docs[0]
    callback({ id: d.id, ...d.data(), createdAt: d.data().createdAt?.toDate() } as Insight)
  })
}
