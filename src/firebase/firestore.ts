import { AnimeData, UpdateData } from "@/interfaces/interface";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../../firebase";

export const addAnime = async (animeData: Omit<AnimeData, "id">) => {
  try {
    const docRef = await addDoc(collection(db, "anime"), {
      ...animeData,
      timestamp: serverTimestamp(),
    });

    await updateDoc(doc(db, "anime", docRef.id), { id: docRef.id });

    console.log("Anime added successfully with ID:", docRef.id);
    return docRef.id; // Return the generated ID
  } catch (error) {
    console.error("Error adding anime:", error);
    throw error;
  }
};

export const getAnimes = async () => {
  const animeRef = collection(db, "anime");
  try {
    const snapshot = await getDocs(animeRef);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as AnimeData[];
  } catch (error) {
    console.error("Error adding anime:", error);
    throw error;
  }
};

export const getAnimeStream = (callback: (animeList: AnimeData[]) => void) => {
  const animeRef = collection(db, "anime");
  const q = query(animeRef, orderBy("upVote", "desc"));

  return onSnapshot(q, (snapshot) => {
    const animeList: AnimeData[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      upVote: doc.data().upVote,
      downVote: doc.data().downVote,
      timestamp:
        doc.data().timestamp instanceof Timestamp
          ? doc.data().timestamp.toDate().toISOString() // Fix `.toISOstring` typo
          : null,
    }));

    callback(animeList); // Pass updated list to callback
  });
};

export const updateAnime = async (id: string, data: UpdateData) => {
  const animeRef = doc(db, `anime/${id}`);
  try {
    await updateDoc(animeRef, {
      ...data,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating anime:", error);
    throw error;
  }
};
