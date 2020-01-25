import firebase from './Firebase';
import {COLLECTION_STATISTICS_NAME} from "../config";
import {getRandomNumber} from "../../Components/utilities";

const db = firebase.firestore();

const sampleStats = [
  {
    userName: 'juns',
    levels: {
      medium: [
        {levelNumber: 1, levelScore: 452, time: 10},
        {levelNumber: 2, levelScore: 543, time: 20},
      ],
      hard: [
        {levelNumber: 2, levelScore: 3431, time: 15},
      ]
    }
  },
  {
    userName: 'name_1234',
    levels: {
      medium: [
        {levelNumber: 1, levelScore: 678, time: 12},
        {levelNumber: 2, levelScore: 376, time: 20},
      ]
    }
  }
];

export const getStatsByPseudo = userPseudo => {
  return new Promise((resolve, reject) => {
    isUserExist(userPseudo)
      .then(() => {
        db.collection(COLLECTION_STATISTICS_NAME)
          .doc(userPseudo)
          .get()
          .then(doc => resolve(doc.data())).catch(error => reject(error));
      })
      .catch(err => {console.log('err = ',err); reject(err)})
  });
  /*if(isUserExist) {
     const docRef = db.collection(COLLECTION_STATISTICS_NAME).doc(userName);

     docRef.get().then(function(doc) {
       if (doc.exists) {
         console.log("Document data:", doc.data());
         return doc.data();
       } else {
         // doc.data() will be undefined in this case
         console.log("No such document!");
         return null;
       }
     }).catch(function(error) {
       console.log("Error getting document:", error);
     });
   }*/
};

export const createUserStat = (userPseudo, data) => {
  return new Promise((resolve, reject) => {
    db.collection(COLLECTION_STATISTICS_NAME)
      .doc(userPseudo)
      .set(data, { merge: true })
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
  /*db.collection(COLLECTION_STATISTICS_NAME).doc(userName).set(
      {
        userName: 'juname_1234',
        levels: {
          medium: [
            {levelNumber: 3, levelScore: 678, time: 12},
            {levelNumber: 2, levelScore: 123, time: 20},
          ],
          easy: [{levelNumber: 1, levelScore: 532, time: 20}]
        }
      }, { merge: true }
  );*/
};

export const isUserExist = userPseudo => {
  return new Promise((resolve, reject) => {
    db.collection(COLLECTION_STATISTICS_NAME)
      .doc(userPseudo)
      .get()
      .then(function(doc) {
        doc.exists ? resolve(doc.exists) : reject(doc.exists);
      })
      .catch(function(error) {
        reject(error);
      });
  });
};

export const updateUserStats = (userPseudo, newData) => {
  return new Promise((resolve, reject) => {
    console.log('[updateUserStats] newData = ',newData);
    // WE DO NOT MODIFY DIRECTLY THE STATE SO FOR THAT EACH WE OVERWRITE DIRECTLY ALL THE DATA
    db.collection(COLLECTION_STATISTICS_NAME)
      .doc(userPseudo)
      .set(newData)
      .then(() => resolve(true))
      .catch(() => reject(false));
  });
};

export const getGlobalStats = () => {
  return new Promise((resolve, reject) => {
    db.collection(COLLECTION_STATISTICS_NAME)
      .get()
      .then(function(querySnapshot) {
        let stats = {};
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          stats[doc.id] = doc.data();
        });
        return resolve(stats);
     })
     .catch(error => reject(error));
  });
};

export const sortLevels = levels => levels.sort((a, b) => a.levelNumber - b.levelNumber);

export const updateOrCreateUserLevel = (oldData, difficulty, level) => {
  const newCopy = JSON.parse(JSON.stringify(oldData));
  // let levelDifficulty = newCopy.levels[difficulty];
  if(newCopy.levels[difficulty]) {
    let oldLevel = newCopy.levels[difficulty].find(l => l.levelNumber === level.levelNumber);
    if(oldLevel && oldLevel.levelScore < level.levelScore) {
      // Overwrite the old one only if the score is the highest
      oldLevel.levelNumber = level.levelNumber;
      oldLevel.levelScore = level.levelScore;
      oldLevel.time = level.time;
      oldLevel.updated_at = (new Date().toJSON());
    }
    // We create a new level
    else newCopy.levels[difficulty].push({
      ...level,
      created_at: (new Date().toJSON()),
      updated_at: (new Date().toJSON()),
    });
    // We sort all the by levelScore descending
    newCopy.levels[difficulty] = sortLevels(newCopy.levels[difficulty]);
  }
  else newCopy.levels[difficulty] = [{
      ...level,
      created_at: (new Date().toJSON()),
      updated_at: (new Date().toJSON()),
  }];

  return newCopy;
};
/*console.log('sampleStats =====> ',sampleStats[0]);
let tmp = updateOrCreateUserLevel(sampleStats[0], 'easy', {levelNumber: 2, levelScore: 20, time: 15});

sampleStats[0] = tmp;
console.log('sampleStatsTMP =====> ',sampleStats[0]);

let a = updateOrCreateUserLevel(sampleStats[0], 'easy', {levelNumber: 2, levelScore: 45, time: 15});
// console.log('a =====> ',a);
sampleStats[0] = a;
console.log('sampleStatsAAA =====> ',sampleStats[0]);*/

/*
* =========================================================================
*
* USER SESSION FUNCTIONS
*
* =========================================================================
* */

export const isUserSessionValueExist = () => localStorage.getItem('userPseudo') !== null;

export const generateStringByType = type => {
  const mapping = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z'
  ];
  const d = new Date();
  let suffixGenerated = [
    mapping[ ~~(d.getFullYear()) - 2018 ],
    mapping[ ~~(d.getMonth()) ],
    mapping[ ~~(d.getDay()) ],
    mapping[ ~~(d.getHours()) ],
    mapping[ ~~(d.getMinutes()) ],
    mapping[ ~~(d.getSeconds()) ],
    mapping[ getRandomNumber(0, 51) ],
  ].join('');
  if(type === 'userName') {
    return 'name_' + suffixGenerated
  }
  else if (type === 'userPseudo') return 'ps_' + suffixGenerated;
  else return suffixGenerated;
};

export const generateUserSessionValue = () => {
  if(!isUserSessionValueExist()){
    localStorage.setItem('userName', generateStringByType('userName'));
    localStorage.setItem('userPseudo', generateStringByType('userPseudo'));
    localStorage.setItem('isUserGenerated', 'true');
    return true;
  }
  return false;
};

export const updateUserSessionValue = (userPseudo, userName, isUserGenerated = false) => {
  if(isUserSessionValueExist()){
    localStorage.setItem('userName', userName);
    localStorage.setItem('userPseudo', userPseudo);
    localStorage.setItem('isUserGenerated', '' + isUserGenerated);
    return true;
  }
  return false;
};

export const getUserSessionValue = () => {
  if(isUserSessionValueExist()) {
    return {
      userName: localStorage.getItem('userName'),
      userPseudo: localStorage.getItem('userPseudo'),
      isUserGenerated: localStorage.getItem('isUserGenerated') === 'true',
    }
  }
  return null;
};

// export const getSta