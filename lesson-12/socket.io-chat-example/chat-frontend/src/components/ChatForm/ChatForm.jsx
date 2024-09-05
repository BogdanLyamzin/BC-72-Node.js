import useForm from "../../hooks/useForm";

const initialState = {
    message: ""
}

const ChatForm = ({onSubmit}) => {
    const { state, handleChange, handleSubmit } = useForm({ initialState, onSubmit });
   
    const {message} = state;

    return (
        <form onSubmit={handleSubmit}>
            <input value={message} name="message" onChange={handleChange} placeholder="Enter your message" />
            <button>Send</button>
        </form>
    )
}

export default ChatForm;