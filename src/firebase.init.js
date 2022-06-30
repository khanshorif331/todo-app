// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDIoOiZxVQt09VpAdtKtOmTVjwVg5dcZCs',
	authDomain: 'todos-eda0d.firebaseapp.com',
	projectId: 'todos-eda0d',
	storageBucket: 'todos-eda0d.appspot.com',
	messagingSenderId: '366895934649',
	appId: '1:366895934649:web:61898af5999c222e3f3f68',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export default auth
