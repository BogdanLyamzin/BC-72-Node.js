import useForm from "../../hooks/useForm";

const initialState = {
    nickname: ""
};

const SigninChatForm = ({onSubmit}) => {
    const { state, handleChange, handleSubmit } = useForm({ initialState, onSubmit });

    const {nickname} = state;

    return (
        <form onSubmit={handleSubmit}>
            <input value={nickname} name="nickname" onChange={handleChange} placeholder="Enter nickname" required />
            <button type="submit">Connect to chat</button>
        </form>
    )
}

export default SigninChatForm;