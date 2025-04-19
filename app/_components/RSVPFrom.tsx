"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { MapPin } from 'lucide-react'
import React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'
import { toast } from 'sonner';
import { strings } from '../utils/strings'
import { submitRSVP } from '../actions/submitRSVP'



const RSVPFrom = () => {

  const [name, setNAme] = useState('');
  const [email, setEmail] = useState('');
  const [accompany, setAccompany] = useState<string | null>(null);
  const [attendance, setAttendance] = useState("yes");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

const handelSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!name || !email) {
    setErrors({
      name: 'name is Required',
      email: 'email is Required',
    });
    return;
  }

  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('accompany', accompany || "0");
  formData.append('attendance', attendance);
  setIsLoading(true);

  const response = await submitRSVP(formData);
  if (response.success) {
    toast("Success", {
      description: strings.thankYouMessage,
    });

    setNAme("");
    setEmail("");
    setAccompany("0");
    setAttendance('yes');
    setErrors({});
  } else {
    toast("Error", {
      description: response.message,
    });

    if(response.errors){
      if(response.errors.code === '23505'){
        setErrors({email: "Email already exists"});
      }
    }
  }

  setIsLoading(false);
};


  const openGoogleMap = () =>{
    const eventLocation = strings.eventLocation;
    window.open(`https://www.google.com/maps/search/?api=1&query=${eventLocation}`, '_blank');
  }

  return (
    <div className='max-w-md mx-auto my-10'>
      <h1 className='text-2xl font-bold mb-4'>{strings.title}</h1>
      <p className='mb-6'>{strings.description}</p>

      <div className='mb-6'>
        <Label>{strings.eventDateLabel}</Label>
        {/* <p>{new Date(strings.eventDate).toLocaleDateString()}</p> */}
        <Calendar
          mode="single"
          selected={new Date(strings.eventDate)}
          className='rounded-md border flex flex-col items-center'
          fromDate={new Date(strings.eventDate)}
          toDate={new Date(strings.eventDate)}
          defaultMonth={new Date(strings.eventDate)}
          ISOWeek
        />


        <div className='mt-4'>
          <Button className='w-full' variant='outline' type='button' onClick={openGoogleMap}>
            <MapPin/>
            {strings.viewOnMapButton}
          </Button>
        </div>
      </div>

      <form onSubmit={handelSubmit} className='space-y-6'>
        <div>
          <Label htmlFor='name'>{strings.nameLabel}</Label>
          <Input
            type='text'
            id='name'
            placeholder='Your name'
            value={name}
            onChange={(e) => setNAme(e.target.value)}
            required
          />
          {errors.name && (
            <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
          )}
        </div>
        <div>
          <Label htmlFor='email'>{strings.emailLabel}</Label>
          <Input
            type='email'
            id='email'
            placeholder='Your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && (
            <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
          )}
        </div>
        <div>
          <Label htmlFor='accompany'>{strings.accompanyLabel}</Label>
          <Input
            id="accompany"
            type='number'
            min="0"
            placeholder='Number of accompany'
            value={accompany || ''}
            onChange={(e) => setAccompany(e.target.value)}
          />
          {errors.accompany && (
            <p className='text-red-500 text-sm mt-1'>{errors.accompany}</p>
          )}
        </div>
        <div>
          <Label>{strings.rsvpLabel}</Label>
          <RadioGroup value={attendance} onValueChange={setAttendance}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">{strings.yesOption}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">{strings.noOption}</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Button type='submit' disabled={isLoading}>
            {isLoading ? "Sending..." : strings.submitButton}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RSVPFrom
