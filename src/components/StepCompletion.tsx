import * as React from "react";
import { useSelector } from 'react-redux';
import { supabase } from '../services/supabase';

export function StepCompletion({ step, repairId, onComplete }) {
  const { user } = useSelector((state) => state.user);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (user) {
      checkCompletion();
    }
  }, [user, step.id]);

  const checkCompletion = async () => {
    try {
      const { data, error } = await supabase
        .from('completed_steps')
        .select('id')
        .eq('user_id', user.id)
        .eq('repair_id', repairId)
        .eq('step_id', step.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setIsCompleted(!!data);
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleCompletion = async () => {
    if (!user) return;

    try {
      if (isCompleted) {
        const { error } = await supabase
          .from('completed_steps')
          .delete()
          .eq('user_id', user.id)
          .eq('repair_id', repairId)
          .eq('step_id', step.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('completed_steps')
          .insert({
            user_id: user.id,
            repair_id: repairId,
            step_id: step.id
          });

        if (error) throw error;
      }

      setIsCompleted(!isCompleted);
      if (onComplete) onComplete(!isCompleted);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  if (loading) {
    return <activityIndicator busy={true} />;
  }

  return (
    <button
      className={`p-2 rounded ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`}
      text={isCompleted ? '✓ Completed' : 'Mark as Complete'}
      onTap={toggleCompletion}
    />
  );
}