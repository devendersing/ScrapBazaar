import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    rating: 5,
    comment: "The pickup service was prompt and professional. I got a fair price for my scrap metals, and the team was very helpful. Will definitely use again!",
    name: "Rajesh S.",
    location: "Delhi"
  },
  {
    id: 2,
    rating: 4.5,
    comment: "I was surprised by how easy it was to schedule a pickup. The online form was simple, and I received payment right on the spot. Great service overall!",
    name: "Priya M.",
    location: "Mumbai"
  },
  {
    id: 3,
    rating: 5,
    comment: "I had a lot of old newspapers and metal scrap from home renovation. The team was very efficient, and their rates were better than the local scrap dealers.",
    name: "Amit K.",
    location: "Bangalore"
  }
];

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center mb-4">
      <div className="text-yellow-400 flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="material-icons">
            {star <= rating ? "star" : star - 0.5 === rating ? "star_half" : "star_border"}
          </span>
        ))}
      </div>
      <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-16 bg-neutral-custom">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold font-heading text-center mb-12">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white rounded-lg shadow-md">
              <CardContent className="p-6">
                <RatingStars rating={testimonial.rating} />
                <p className="text-gray-700 mb-4">{testimonial.comment}</p>
                <div className="flex items-center">
                  <span className="font-medium">{testimonial.name}</span>
                  <span className="mx-2 text-gray-400">|</span>
                  <span className="text-sm text-gray-600">{testimonial.location}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
