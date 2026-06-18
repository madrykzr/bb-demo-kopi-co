/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface KlTime {
  day: string;
  hour: number;
  minute: number;
  second: number;
  formattedString: string;
}

export default function ScheduleIndicator() {
  const [klTime, setKlTime] = useState<KlTime>({
    day: 'Tue',
    hour: 9,
    minute: 0,
    second: 0,
    formattedString: '09:00:00'
  });

  useEffect(() => {
    const updateTime = () => {
      try {
        const d = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kuala_Lumpur',
          weekday: 'short',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });

        const parts = formatter.formatToParts(d);
        
        const day = parts.find(p => p.type === 'weekday')?.value || 'Mon';
        const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
        const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);
        const second = parseInt(parts.find(p => p.type === 'second')?.value || '0', 10);

        // Format zero-padded values
        const hStr = hour.toString().padStart(2, '0');
        const mStr = minute.toString().padStart(2, '0');
        const sStr = second.toString().padStart(2, '0');

        setKlTime({
          day,
          hour,
          minute,
          second,
          formattedString: `${hStr}:${mStr}:${sStr}`
        });
      } catch (err) {
        console.error('Error fetching KL time: ', err);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Tue-Sun 8am-5pm. Closed Mondays.
  const isOpen = klTime.day !== 'Mon' && klTime.hour >= 8 && klTime.hour < 17;

  // Day representation
  const dayFullNames: Record<string, string> = {
    'Mon': 'Monday',
    'Tue': 'Tuesday',
    'Wed': 'Wednesday',
    'Thu': 'Thursday',
    'Fri': 'Friday',
    'Sat': 'Saturday',
    'Sun': 'Sunday'
  };

  return (
    <div className="border border-coffee/15 bg-warm-cream/40 p-5 md:p-6 rounded-sm text-left">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-sepia block">LIVE STATUS · KUALA LUMPUR (GMT+8)</span>
          <div className="flex items-center gap-2 mt-1.5">
            <Clock size={15} className="text-coffee/70" />
            <span className="font-mono text-base font-medium tracking-tight text-coffee">
              {klTime.day} {klTime.formattedString}
            </span>
          </div>
        </div>

        {/* Dynamic status glow indicator */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3">
            {isOpen && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-3 w-3 ${isOpen ? 'bg-emerald-600' : 'bg-coffee/30'}`}></span>
          </span>
          <span className="font-mono text-xs font-bold tracking-widest uppercase">
            {isOpen ? (
              <span className="text-emerald-700">Brewing Now</span>
            ) : (
              <span className="text-coffee/60">Closed for the Day</span>
            )}
          </span>
        </div>
      </div>

      <div className="border-t border-coffee/10 pt-4 text-xs font-mono text-coffee/70 space-y-2">
        <div className="flex justify-between items-center pb-1">
          <span>Tuesday − Sunday</span>
          <span className="font-semibold text-coffee">08:00 − 17:00</span>
        </div>
        <div className="flex justify-between items-center text-coffee/45 pb-1">
          <span>Monday</span>
          <span className="font-semibold uppercase text-sepia/70">Closed</span>
        </div>
        <div className="text-[10px] italic text-coffee/60 pt-2 border-t border-dashed border-coffee/10">
          *Timezone matches Malaysian Standard Time. Last pour is at 16:45.
        </div>
      </div>
    </div>
  );
}
