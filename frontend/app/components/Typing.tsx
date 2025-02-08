const Typing = () => {
    return (
        <>
            <div className="absolute bottom-[120px] flex space-x-2 justify-center items-center bg-white dark:bg-black p-2 rounded">
                <span className="sr-only">Loading...</span>
                <div className="h-3 w-3 bg-white dark:bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-3 w-3 bg-white dark:bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-3 w-3 bg-white dark:bg-gray-300 rounded-full animate-bounce"></div>
            </div>
        </>
    );
};

export default Typing;