import { loginAction } from "../../actions/form-action"
import AuthForm from "../AuthForm"

const page = () => {
  return (
    <div>
      <AuthForm isSingup={false} action={loginAction}/>
    </div>
  )
}

export default page
