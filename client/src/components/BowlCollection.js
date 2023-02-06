import BowlCard from "./BowlCard"


export default function BowlCollection({bowls, likes, setLikes, currentUser}) {

  const bowlCards = bowls.map(bowl => {
    // console.log(bowl.id)
    return <BowlCard key={bowl.id} bowl={bowl} likes={likes} setLikes={setLikes} currentUser={currentUser} /> 
  })

  return (
    <div className="items-container">
      {bowlCards}
    </div>
  )
}