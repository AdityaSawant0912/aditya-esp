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
        const gpios = await GPIO.find()
        return NextResponse.json(gpios)
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching boards', dberror: error })
    }
}

export async function PUT(req) {
    const { pin, state } = await req.json()
    console.log("PIN", pin, state);
    try {
        await dbconnect();
    } catch (error) {
        return NextResponse.json({ error: 'Database connection error', dberror: error })
    }
    try {
        const gpio = await GPIO.findOneAndUpdate({ pin: pin }, {state: state })
        return NextResponse.json(gpio)
    }catch (error){
        console.log(error);
        return NextResponse.json({ error: 'Error fetching boards', dberror: error })
    }   
}



export async function POST (req) {
    const { name, pin } = await req.json()
    console.log(name, pin);
    try {
        await dbconnect();
    } catch (error) {
        return NextResponse.json({ error: 'Database connection error', dberror: error })
    }
    try {
        const gpio = new GPIO({ name, pin, state: "0" })
        await gpio.save()
        return NextResponse.json(gpio)
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching gpios', dberror: error })
    }
}