import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/leads.json');

export async function GET() {
  const fileContent = fs.readFileSync(dataPath, 'utf8');
  return NextResponse.json(JSON.parse(fileContent));
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const fileContent = fs.readFileSync(dataPath, 'utf8');
    const leads = JSON.parse(fileContent);
    
    if (!data.id) {
      // New lead from contact form
      data.id = 'lead-' + Date.now();
      data.date = new Date().toISOString().split('T')[0];
      data.status = 'New';
      leads.unshift(data); // Add to top
    } else {
      // Update existing lead (e.g. changing status)
      const idx = leads.findIndex((l: any) => l.id === data.id);
      if (idx !== -1) leads[idx] = data;
    }
    
    fs.writeFileSync(dataPath, JSON.stringify(leads, null, 2));
    const { revalidatePath } = require('next/cache');
    revalidatePath('/admin');
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const fileContent = fs.readFileSync(dataPath, 'utf8');
    let leads = JSON.parse(fileContent);
    leads = leads.filter((l: any) => l.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(leads, null, 2));
    const { revalidatePath } = require('next/cache');
    revalidatePath('/admin');
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
