type ButtonInterface = {
  readonly title: string;
};

export default function Button({ title }: ButtonInterface) {
  return (
    <button
      type='submit'
      title={title}
      className='m-auto mb-4 w-16 rounded-sm border bg-white px-2 py-1 text-xs text-indigo-950 transition-colors duration-300 ease-in-out hover:bg-indigo-950 hover:text-white disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200'
    >
      {title}
    </button>
  );
}
