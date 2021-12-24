import React, { useState } from "react";
import styles from './form.module.css';

export function Form() {
  const [name, setName] = useState('')
  const [favoriteColor, setFavoriteColor] = useState('')
  const [response, setResponse] = useState()

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log('submit')

    const response = await fetch('/.netlify/functions/submit', {
      method: 'POST',
      body: JSON.stringify({name, favoriteColor})
    }).then(res=>res.json())

    setResponse(response)
    setName('')
    setFavoriteColor('')

  }

  return (
    <>
    <pre>{JSON.stringify(response, null, 5)}</pre>
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="name" className={styles.label}>
        Name
      </label>
      <input value={name} className={styles.input} type="text" id="name" name="name" onChange={(e) => setName(e.target.value)}/>

      <label htmlFor="favoriteColor" className={styles.label}>
      Favorite Color
      </label>
      <input value={favoriteColor} className={styles.input} type="text" id="favoriteColor" name="favoriteColor" onChange={(e) => setFavoriteColor(e.target.value)}/>

    <button className={styles.button}>Submit</button>
    </form>

    </>
  )

}