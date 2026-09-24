import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const dataPath = path.join(process.cwd(), 'src/data/properties.json');
  const fileContent = fs.readFileSync(dataPath, 'utf8');
  return NextResponse.json(JSON.parse(fileContent));
}

const dataPath = path.join(process.cwd(), 'src/data/properties.json');

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const fileContent = fs.readFileSync(dataPath, 'utf8');
    const properties = JSON.parse(fileContent);
    
    if (!data.id) {
      data.id = 'prop-' + Date.now();
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      // Set defaults for arrays if empty
      if(!data.amenities) data.amenities = [];
      if(!data.images) data.images = ['/images/placeholder.jpg'];
      properties.push(data);
    } else {
      const idx = properties.findIndex((p: any) => p.id === data.id);
      if (idx !== -1) properties[idx] = data;
    }
    
    fs.writeFileSync(dataPath, JSON.stringify(properties, null, 2));
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
    let properties = JSON.parse(fileContent);
    properties = properties.filter((p: any) => p.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(properties, null, 2));
    const { revalidatePath } = require('next/cache');
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
