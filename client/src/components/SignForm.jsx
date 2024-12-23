import SignTextField from "./SignTextField";
import SubmitBtn from "./submitBtn";

function SignForm({ loginData, handleInputChange, submitAction, btnText, children }) {
    return (
        <form
            className="flex flex-col gap-4 px-10 py-6 my-5 rounded-lg bg-stone-700"
            onSubmit={submitAction}
        >
            <SignTextField
                field="username"
                type="text"
                value={loginData.username}
                action={handleInputChange}
            />
            <SignTextField
                field="password"
                type="password"
                value={loginData.password}
                action={handleInputChange}
            />
            <SubmitBtn>{btnText}</SubmitBtn>
            {children}
        </form>
    );
}

export default SignForm;
