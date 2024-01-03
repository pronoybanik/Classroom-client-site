

const PrimaryButton = ({ children, secondary, full, handler }) => {
    return (
        <button type="submit" className={`${secondary ? ' bg-slate-50 text-gray-900 border border-gray-800 hover:bg-[#1E90FF] hover:text-slate-50 hover:border-white' : 'text-white bg-gray-800 hover:bg-[#1E90FF] '} ${full && 'w-full'}  font-medium rounded-[4px] text-lg px-7 py-2.5 my-5`}>
            {children}
        </button>
    );
};

export default PrimaryButton;