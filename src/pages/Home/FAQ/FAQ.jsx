
const FAQ = () => {
    return (
        <div className='max-w-8/12 mx-auto mb-28'>
            <div className=' max-w-2xl mx-auto text-center'>
                <h1 className='text-4xl font-bold'>Frequently Asked Question (FAQ)</h1>

                <p className='text-gray-700 mt-8 mb-12'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
            </div>



            <div className='space-y-5'>

                <div className="collapse collapse-arrow bg-base-100 border border-base-300 has-[input:checked]:bg-[#E6F2F3]">
                    <input type="radio" name="faq-accordion" defaultChecked />

                    <div className="collapse-title font-semibold">
                        How does this posture corrector work?
                    </div>

                    <div className="collapse-content text-sm">
                        <div className="border-t border-dashed border-gray-300 w-full mb-4"></div>
                        A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.
                    </div>
                </div>


                <div className="collapse collapse-arrow bg-base-100 border border-base-300 has-[input:checked]:bg-[#E6F2F3]">
                    <input type="radio" name="faq-accordion" />

                    <div className="collapse-title font-semibold">
                        Is it suitable for all ages and body types?
                    </div>

                    <div className="collapse-content text-sm">
                        <div className="border-t border-dashed border-gray-300 w-full mb-4"></div>
                        Yes. MoveX is designed to be comfortable and accessible for riders of different ages, sizes, and body types. Our services are made to provide a safe, convenient, and user-friendly experience for everyone.
                    </div>
                </div>


                <div className="collapse collapse-arrow bg-base-100 border border-base-300 has-[input:checked]:bg-[#E6F2F3]">
                    <input type="radio" name="faq-accordion" />

                    <div className="collapse-title font-semibold">
                        Does it really help with back pain and posture improvement?
                    </div>

                    <div className="collapse-content text-sm">
                        <div className="border-t border-dashed border-gray-300 w-full mb-4"></div>
                        Yes, it can help! MoveX Rider’s ergonomic design supports better posture and may reduce back strain during long rides. Regular use, combined with proper sitting posture and breaks, can help improve overall comfort and reduce back discomfort.
                    </div>
                </div>


                <div className="collapse collapse-arrow bg-base-100 border border-base-300 has-[input:checked]:bg-[#E6F2F3]">
                    <input type="radio" name="faq-accordion" />

                    <div className="collapse-title font-semibold">
                        Does it have smart features like vibration alerts?
                    </div>

                    <div className="collapse-content text-sm">
                        <div className="border-t border-dashed border-gray-300 w-full mb-4"></div>
                        Yes. The MoveX Rider App includes smart notification features such as **vibration alerts** to notify riders about new delivery requests, order updates, and important status changes. This helps riders stay updated even when they are on the move.
                    </div>
                </div>


                <div className="collapse collapse-arrow bg-base-100 border border-base-300 has-[input:checked]:bg-[#E6F2F3]">
                    <input type="radio" name="faq-accordion" />

                    <div className="collapse-title font-semibold">
                        How will I be notified when the product is back in stock?
                    </div>

                    <div className="collapse-content text-sm">
                        <div className="border-t border-dashed border-gray-300 w-full mb-4"></div>
                        You’ll receive a notification as soon as the product is back in stock, so you can place your order right away.
                    </div>
                </div>

            </div>



        </div>
    );
};

export default FAQ; 