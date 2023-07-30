import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authSlice";

const { addUser, LogOut, addUserAvatar } = authSlice.actions;

export const registerDB =
  ({ mail, password, userName, avatar }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, mail, password);

      const user = await auth.currentUser;

      await updateProfile(user, { displayName: userName });
      await updateProfile(user, { photoURL: avatar });

      const { uid, displayName, email, photoURL } = await auth.currentUser;

      dispatch(
        addUser({
          userId: uid,
          userName: displayName,
          userEmail: email,
          avatar: photoURL,
        })
      );
    } catch (error) {
      throw error;
    }
  };

export const loginDB =
  ({ mail, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, mail, password);

      dispatch(
        authSlice.actions.addUser({
          userId: user.uid,
          userName: user.displayName,
          userEmail: user.email,
          avatar: user.photoURL,
        })
      );
    } catch (error) {
      console.dir(error);
    }
  };

export const LogOutDB = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(LogOut());
  } catch (error) {
    throw error;
  }
};

export const authStateChanged = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        authSlice.actions.addUser({
          userId: user.uid,
          userName: user.displayName,
          userEmail: user.email,
        })
      );
    }
  });
};

export const addAvatar =
  ({ avatar }) =>
  async (dispatch, getState) => {
    try {
      const user = await auth.currentUser;

      await updateProfile(user, { photoURL: avatar });

      const { photoURL } = await auth.currentUser;

      dispatch(addUserAvatar({ avatar: photoURL }));
    } catch (error) {
      throw error;
    }
  };
