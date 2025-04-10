type ButtonInterface = {
  readonly title: string;
};

export default function Button({ title }: ButtonInterface) {
  return (
    <button
      type='submit'
      className='m-auto w-16 rounded-sm border px-2 py-1 text-xs text-indigo-950'
    >
      {title}
    </button>
  );
}
