function SubmitBtn({children}) {
    return (
        <button
            type="submit"
            className="text-xl tracking-wider cursor-pointer bg-stone-800 hover:bg-stone-900"
        >
            {children}
        </button>
    );
}
export default SubmitBtn;
