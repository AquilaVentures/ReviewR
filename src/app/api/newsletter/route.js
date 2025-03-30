import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Subscriber from '@/models/Newsletter';

export async function POST(request) {
    try {
        await dbConnect();
        const { email } = await request.json();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: 'Please provide a valid email address' },
                { status: 400 }
            );
        }
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return NextResponse.json(
                { error: 'This email is already subscribed' },
                { status: 409 }
            );
        }
        const newSubscriber = new Subscriber({
            email,
        });

        await newSubscriber.save();
        return NextResponse.json(
            { message: 'Subscription successful' },
            { status: 201 }
        );

    } catch (error) {
        console.error('Subscription error:', error);
        return NextResponse.json(
            { error: 'An error occurred while processing your subscription' },
            { status: 500 }
        );
    }
}