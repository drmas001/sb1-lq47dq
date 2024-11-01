import * as React from "react";
import { useSelector } from 'react-redux';
import { supabase } from '../services/supabase';

export function SafetyTips({ repairId }) {
  const [tips, setTips] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchSafetyTips();
  }, [repairId]);

  const fetchSafetyTips = async () => {
    try {
      const { data, error } = await supabase
        .from('safety_tips')
        .select('*')
        .eq('repair_id', repairId);

      if (error) throw error;
      setTips(data);
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <stackLayout className="bg-white p-4 rounded-lg">
      <label className="text-xl font-bold mb-2" text="Safety Tips" />
      {loading ? (
        <activityIndicator busy={true} />
      ) : (
        <listView
          items={tips}
          className="gap-2"
          itemTemplate={(tip) => (
            <gridLayout columns="auto,*" className="mb-2">
              <label col="0" text="⚠️" className="mr-2" />
              <label col="1" text={tip.description} textWrap={true} className="text-gray-700" />
            </gridLayout>
          )}
        />
      )}
    </stackLayout>
  );
}