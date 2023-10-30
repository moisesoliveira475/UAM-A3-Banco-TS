import 'isomorphic-fetch';
import { userInformations } from '@/types/auth.types';
import { connectAuthEmulator, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { auth, db, functions } from '../services/firebase';
import { getTransactionsInPeriod } from '../utils/getTransactionsInPeriod';


describe("Testing get movements", () => {   
  beforeAll(async () => {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
    await auth.signOut();
  });

  it("Atualizar o histórico de movimentações", async () => {
    const userCredential = await signInWithEmailAndPassword(auth, "pervious@gmail.com", "senhadificil");
    const user = userCredential.user;
    const docRef = doc(db, 'users', user?.uid);
    await updateDoc(docRef, {
      historicOfMovements: [
        { value: 100, date: new Date('2023-01-01'), type: 'deposit' },
        { value: -50, date: new Date('2023-01-15'), type: 'withdraw' },
        { value: 200, date: new Date('2023-02-01'), type: 'deposit' },
        { value: 362, date: new Date('2022-10-16'), type: 'deposit' },
        { value: -200, date: new Date('2022-11-10'), type: 'withdraw' },
        { value: 1000, date: new Date('2022-12-20'), type: 'deposit' },
      ],
    });
  });
  
  it("Deve retornar as transações no período correto", async () => {
    const userCredential = await signInWithEmailAndPassword(auth, "pervious@gmail.com", "senhadificil");
    const user = userCredential.user;
    const docRef = doc(db, 'users', user?.uid);
    const docSnap = (await getDoc(docRef)).data() as userInformations;
    const historicUpdated = docSnap.historicOfMovements.map((movement) => {
      return {
        ...movement,
        date: movement.date.toDate(),
      };
    });

    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-02-28');

    const result = getTransactionsInPeriod({transactions: historicUpdated, startDate, endDate});

    // Asserção para verificar se as transações retornadas estão dentro do período esperado
    expect(result).toEqual([
      { value: 100, date: new Date('2023-01-01'), type: 'deposit' },
      { value: -50, date: new Date('2023-01-15'), type: 'withdraw' },
      { value: 200, date: new Date('2023-02-01'), type: 'deposit' },
    ]);    
  });

  it('Deve retornar um array vazio se não houver transações no período', async () => {
    const userCredential = await signInWithEmailAndPassword(auth, "pervious@gmail.com", "senhadificil");
    const user = userCredential.user;
    const docRef = doc(db, 'users', user?.uid);
    const docSnap = (await getDoc(docRef)).data() as userInformations;
    const historicUpdated = docSnap.historicOfMovements.map((movement) => {
      return {
        ...movement,
        date: movement.date.toDate(),
      };
    });

    const startDate = new Date('2022-01-01');
    const endDate = new Date('2022-10-10');
  
    const result = getTransactionsInPeriod({transactions: historicUpdated, startDate, endDate});
  
    // Asserção para verificar se o resultado é um array vazio
    expect(result).toEqual([]);
  });
});
