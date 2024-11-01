import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { supabase } from '../services/supabase';

export function RepairDetails({ route, navigation }) {
  const [repair, setRepair] = React.useState(null);
  const [steps, setSteps] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchRepairDetails();
  }, []);

  const fetchRepairDetails = async () => {
    try {
      const { data: repairData, error: repairError } = await supabase
        .from('repairs')
        .select('*')
        .eq('id', route.params.repairId)
        .single();

      if (repairError) throw repairError;

      const { data: stepsData, error: stepsError } = await supabase
        .from('steps')
        .select('*')
        .eq('repair_id', route.params.repairId)
        .order('step_order', { ascending: true });

      if (stepsError) throw stepsError;

      setRepair(repairData);
      setSteps(stepsData);
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <gridLayout className="p-4">
        <activityIndicator busy={true} />
      </gridLayout>
    );
  }

  return (
    <scrollView className="bg-gray-100">
      <stackLayout className="p-4">
        {/* Header */}
        <label className="text-2xl font-bold mb-2" text={repair?.title} />
        <label className="text-gray-600 mb-4" text={repair?.description} />

        {/* Tools Required */}
        <label className="text-xl font-bold mb-2">Tools Required</label>
        <listView
          items={repair?.tools || []}
          className="mb-4"
          itemTemplate={(tool) => (
            <label className="p-2 bg-white rounded mb-1" text={tool.name} />
          )}
        />

        {/* Repair Steps */}
        <label className="text-xl font-bold mb-2">Steps</label>
        <listView
          items={steps}
          itemTemplate={(step) => (
            <stackLayout className="p-4 bg-white rounded mb-2">
              <label className="font-bold mb-1" text={`Step ${step.step_order}`} />
              <label text={step.description} textWrap={true} />
              {step.image_url && (
                <image
                  src={step.image_url}
                  className="h-40 w-full object-cover rounded mt-2"
                />
              )}
            </stackLayout>
          )}
        />
      </stackLayout>
    </scrollView>
  );
}