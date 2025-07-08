import React from 'react';

const services = [
	{
		title: 'Individual Counseling',
		description:
			'One-on-one therapy sessions focused on your personal growth, mental health, and well-being. Perfect for addressing anxiety, depression, trauma, and personal challenges.',
		price: '$200 per session',
		duration: '50 minutes',
	},
	{
		title: 'Family Counseling',
		description:
			'Therapy sessions designed to improve family dynamics, communication, and relationships. Ideal for resolving conflicts and strengthening family bonds.',
		price: '$240 per session',
		duration: '80 minutes',
	},
];

function Services() {
	return (
		<div className="bg-[#f7f7fa] min-h-screen py-8 px-4">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-4xl text-center mb-8 text-[#3bb6b0] font-bold">
					Our Services
				</h1>
				<p className="text-lg text-center mb-12 text-[#2a2e4b] max-w-3xl mx-auto">
					Dr. Serena Blake offers comprehensive mental health services designed to
					support your journey towards healing and personal growth.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
					{services.map((service, idx) => (
						<div
							key={idx}
							className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-8"
						>
							<h2 className="text-2xl mb-4 text-[#3bb6b0] font-semibold">
								{service.title}
							</h2>
							<p className="mb-4 text-[#2a2e4b] leading-relaxed">
								{service.description}
							</p>
							<div className="space-y-2 mb-6">
								<p className="text-xl text-[#3bb6b0] font-medium">
									{service.price}
								</p>
								<p className="text-[#2a2e4b]">
									Duration: {service.duration}
								</p>
							</div>
							<div className="flex gap-4">
								<button className="bg-[#3bb6b0] hover:bg-[#2a9d96] text-white px-6 py-2 rounded-lg font-medium transition-colors">
									Book Session
								</button>
								<button className="border-2 border-[#3bb6b0] text-[#3bb6b0] hover:bg-[#3bb6b0] hover:text-white px-6 py-2 rounded-lg font-medium transition-colors">
									Learn More
								</button>
							</div>
						</div>
					))}
				</div>

				<div className="mt-16 text-center">
					<div className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto p-8">
						<h2 className="text-2xl mb-4 text-[#3bb6b0] font-semibold">
							Ready to Start Your Journey?
						</h2>
						<p className="mb-6 text-[#2a2e4b]">
							Take the first step towards better mental health. Contact Dr. Serena
							Blake today to schedule your consultation.
						</p>
						<div className="space-y-4">
							<p className="text-[#2a2e4b]">
								<strong>Phone:</strong> (+323) 555-0192
							</p>
							<p className="text-[#2a2e4b]">
								<strong>Email:</strong> serena@blakepsychology.com
							</p>
							<button className="bg-[#3bb6b0] hover:bg-[#2a9d96] text-white px-8 py-3 rounded-lg font-medium transition-colors mt-4">
								Schedule Consultation
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Services;
