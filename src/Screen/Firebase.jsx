import {initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyDcu-vqlOFPcYjSA0JxLQ6yAx6Ybij5DpI",
  authDomain: "orgapp-25d3e.firebaseapp.com",
  projectId: "orgapp-25d3e",
  storageBucket: "orgapp-25d3e.appspot.com",
  messagingSenderId: "940114655309",
  appId: "1:940114655309:web:5a2ed67775027359708404"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)