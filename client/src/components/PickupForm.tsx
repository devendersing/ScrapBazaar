import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { pickupFormSchema, insertPickupSchema } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import FileUpload from '@/components/FileUpload';

// Available materials for pickup
const scrapMaterials = [
  { id: 'paper', label: 'Paper' },
  { id: 'plastic', label: 'Plastic' },
  { id: 'metal', label: 'Metal' },
  { id: 'electronic', label: 'Electronics' },
  { id: 'glass', label: 'Glass' },
  { id: 'other', label: 'Other' }
];

const PickupForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(pickupFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      materials: [] as string[],
      date: '',
      notes: '',
      status: 'pending'
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiRequest('POST', '/api/pickups', formData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Pickup scheduled!",
        description: "We will contact you to confirm the details.",
        variant: "default",
      });
      form.reset();
      setFile(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to schedule pickup. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: any) => {
    const formData = new FormData();
    
    // Append text data
    for (const [key, value] of Object.entries(data)) {
      if (key === 'materials') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value as string);
      }
    }
    
    // Append file if exists
    if (file) {
      formData.append('image', file);
    }
    
    mutate(formData);
  };

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your phone number"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">Pickup Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your complete address"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div>
          <FormLabel className="block text-gray-700 font-medium mb-2">Select Scrap Materials</FormLabel>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {scrapMaterials.map((material) => (
              <FormField
                key={material.id}
                control={form.control}
                name="materials"
                render={({ field }) => (
                  <FormItem className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-neutral-custom space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(material.id)}
                        onCheckedChange={(checked) => {
                          const currentValue = field.value || [];
                          const newValue = checked
                            ? [...currentValue, material.id]
                            : currentValue.filter(val => val !== material.id);
                          field.onChange(newValue);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer font-normal">
                      {material.label}
                    </FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
          {form.formState.errors.materials && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.materials.message}</p>
          )}
        </div>
        
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">Preferred Pickup Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FileUpload onFileChange={handleFileChange} />
        
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">Additional Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any additional information"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  rows={2}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="pt-4">
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-md transition font-medium text-lg"
            disabled={isPending}
          >
            <span className="material-icons mr-2">schedule_send</span>
            {isPending ? "Scheduling..." : "Schedule My Pickup"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PickupForm;
