import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/plots.json');

export async function GET() {
  const fileContent = fs.readFileSync(dataPath, 'utf8');
  return NextResponse.json(JSON.parse(fileContent));
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const fileContent = fs.readFileSync(dataPath, 'utf8');
    const plots = JSON.parse(fileContent);
    
    if (!data.id) {
      data.id = 'plot-' + Date.now();
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      if(!data.images) data.images = ['/images/placeholder.jpg'];
      plots.push(data);
    } else {
      const idx = plots.findIndex((p: any) => p.id === data.id);
      if (idx !== -1) plots[idx] = data;
    }
    
    fs.writeFileSync(dataPath, JSON.stringify(plots, null, 2));
    const { revalidatePath } = require('next/cache');
    revalidatePath('/', 'layout');
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
    let plots = JSON.parse(fileContent);
    plots = plots.filter((p: any) => p.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(plots, null, 2));
    const { revalidatePath } = require('next/cache');
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
