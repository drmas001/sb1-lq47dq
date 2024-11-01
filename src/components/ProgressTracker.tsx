import * as React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { supabase } from '../services/supabase';

export function ProgressTracker({ repairId }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [progress, setProgress] = React.useState({
    completedSteps: [],
    totalSteps: 0,
    percentage: 0
  });

  React.useEffect(() => {
    if (user) {
      fetchProgress();
    }
  }, [user, repairId]);

  const fetchProgress = async () => {
    try {
      const { data: steps, error: stepsError } = await supabase
        .from('steps')
        .select('id')
        .eq('repair_id', repairId);

      if (stepsError) throw stepsError;

      const { data: completed, error: completedError } = await supabase
        .from('completed_steps')
        .select('step_id')
        .eq('user_id', user.id)
        .eq('repair_id', repairId);

      if (completedError) throw completedError;

      const totalSteps = steps.length;
      const completedSteps = completed.map(c => c.step_id);
      const percentage = Math.round((completedSteps.length / totalSteps) * 100);

      setProgress({
        completedSteps,
        totalSteps,
        percentage
      });
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <stackLayout className="bg-white p-4 rounded-lg mb-4">
      <gridLayout columns="*,auto" className="mb-2">
        <label col="0" className="text-lg font-semibold" text="Progress" />
        <label col="1" className="text-blue-500" text={`${progress.percentage}%`} />
      </gridLayout>
      <progressBar
        value={progress.percentage}
        maxValue={100}
        className="bg-blue-500"
      />
      <label 
        className="text-gray-600 mt-2" 
        text={`${progress.completedSteps.length} of ${progress.totalSteps} steps completed`}
      />
    </stackLayout>
  );
}