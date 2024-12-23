function SignTextField({field, type, value, action}) {
    return (
        <div className="flex flex-wrap justify-between">
            <label htmlFor={field}>{field}</label>
            <input
                className="text-black bg-white"
                type={type}
                id={field}
                name={field}
                value={value}
                onChange={action}
            />
        </div>
    );
}
export default SignTextField;
