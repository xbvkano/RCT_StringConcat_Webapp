// Assignment screen
import {Determinant} from '../components/questionsTemplates'
interface AssignmentProps {
  det: Determinant;
  onStart: () => void;
}
export const AssignmentScreen: React.FC<AssignmentProps> = ({ det, onStart }) => (
  <>
    <h1 className="text-4xl font-extrabold text-white text-center mb-4">
      Ready for the experiment? 🎉
    </h1>
    <p className="text-white text-center max-w-xl mb-6">
      You’ve been assigned to{' '}
      <code>
        {det.Lhand}SPECIAL{det.Rhand}
      </code>{' '}
      mode.
    </p>
    <button
      onClick={onStart}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow-md transition-all"
    >
      Start Experiment
    </button>
  </>
);