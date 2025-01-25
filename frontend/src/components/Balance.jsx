
const Balance = ({ value }) => {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-500 mb-1">
        Current Balance
      </span>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold text-indigo-600">₹</span>
        <span className="text-4xl font-bold text-indigo-600 ml-1">
          {new Intl.NumberFormat('en-IN').format(value)}
        </span>
      </div>
    </div>
  );
};

export default Balance;