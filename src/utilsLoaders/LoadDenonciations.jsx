import React, { useEffect } from 'react'

import { ref, onValue, get, onChildAdded } from "firebase/database";
import { db } from "../plugins/firebase";
import { denonciationAsyncThunc } from '../redux/slices/denonciationSlices';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
const LoadDenonciations = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        const dbRef = ref(db, "plaintes/")
        onValue(dbRef, (snapshot) => {
            let snapshotData = snapshot.val()
            dispatch(denonciationAsyncThunc(snapshotData))

        })

        get(dbRef)
            .then((snapshot) => {
                let snapshotData = snapshot.val()
                dispatch(denonciationAsyncThunc(snapshotData))
            })
            .catch((e) => {

                toast.error(`Une erreur est survenue lors de la récupération des données.`, { draggable: true })
            })

    }, []);

    return (
        <div>
            {
                props.children
            }
        </div>
    )
}

export default LoadDenonciations