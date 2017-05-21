
import Firebase from 'firebase'

export default () => {
  let config = {
    apiKey: 'AIzaSyAqapsmxLcTK4lbduJdFqoP7LVdonN0Vfo',
    authDomain: 'cheat-sheet-f8084.firebaseapp.com',
    databaseURL: 'https://cheat-sheet-f8084.firebaseio.com',
    projectId: 'cheat-sheet-f8084',
    storageBucket: 'cheat-sheet-f8084.appspot.com',
    messagingSenderId: '56816907305'
  }

  return Firebase.initializeApp(config)
}
