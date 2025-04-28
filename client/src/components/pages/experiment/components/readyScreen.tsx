// Assignment screen
interface ReadyScreen {
  onStart: () => void;
}
export const ReadyScreen: React.FC<ReadyScreen> = ({ onStart }) => (
  <>
    <h1 className="text-4xl font-extrabold text-white text-center mb-4">
      Ready for the experiment? 🎉
    </h1>
    <p className="text-white text-center max-w-xl mb-6">
      Again, You’ve been assigned to{' '}

      mode.
    </p>
    <button
      onClick={onStart}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow-md transition-all"
    >
      Start experiment
    </button>
  </>
);