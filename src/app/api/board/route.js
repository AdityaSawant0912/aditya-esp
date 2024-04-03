import dbconnect from '@/lib/dbconnect'
import GPIO from '@/models/GPIO'
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        await dbconnect();
    } catch (error) {
        return NextResponse.json({ error: 'Database connection error', dberror: error })
    }
    try {
        const gpios = await GPIO.find({})
        
        let obj = {}
        gpios.forEach(gpio => {
            obj[gpio.pin] = gpio.state
        });
        
        return NextResponse.json(obj)
        
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching boards', dberror: error })
    }
}

