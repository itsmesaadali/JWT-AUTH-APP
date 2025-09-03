import { signupAction } from "../../actions/form-action"
import AuthForm from "../AuthForm"

const page = () => {
  return (
    <div>
        <AuthForm isSingup action={signupAction}/>
    </div>
  )
}

export default page
