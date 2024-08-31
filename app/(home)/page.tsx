import { redirect } from "next/navigation"


const HomePage = () => {
  redirect("/login")
  return (
    <div>HomePage</div>
  )
}

export default HomePage