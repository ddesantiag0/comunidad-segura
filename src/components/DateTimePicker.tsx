import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ value, onChange, id }) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [timeValue, setTimeValue] = useState('');

  React.useEffect(() => {
    if (value) {
      // Try to parse existing value
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        setSelectedDate(date);
        setTimeValue(format(date, 'HH:mm'));
      }
    }
  }, []);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    updateDateTime(date, timeValue);
  };

  const handleTimeChange = (time: string) => {
    setTimeValue(time);
    updateDateTime(selectedDate, time);
  };

  const updateDateTime = (date: Date | undefined, time: string) => {
    if (date) {
      const [hours, minutes] = time.split(':').map(Number);
      if (!isNaN(hours) && !isNaN(minutes)) {
        const newDate = new Date(date);
        newDate.setHours(hours, minutes);
        onChange(format(newDate, 'PPp'));
      } else {
        onChange(format(date, 'PP'));
      }
    }
  };

  return (
    <div className="space-y-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            initialFocus
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
      
      <div className="flex items-center space-x-2">
        <Clock className="h-4 w-4" />
        <Input
          type="time"
          value={timeValue}
          onChange={(e) => handleTimeChange(e.target.value)}
          className="w-32"
        />
      </div>
    </div>
  );
};

export default DateTimePicker;
