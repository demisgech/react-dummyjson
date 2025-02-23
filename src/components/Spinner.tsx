interface Props {
  isLoading: boolean;
}

const Spinner = ({ isLoading }: Props) => {
  if (isLoading)
    return (
      <div className="w-3 h-3 p-4 rounded-full border-3 border-green-400 border-t-0 border-l-0 animate-spin" />
    );
};

export default Spinner;
