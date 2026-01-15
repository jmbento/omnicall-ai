import React from 'react';
import { GlassContainer, Button, Input, Card } from '@/components/ui';
import { Activity, ShieldCheck, Heart, Zap } from 'lucide-react';

const DesignSystemSpec = () => {
  return (
    <div className="p-10 space-y-12">
      <section>
        <h2 className="text-2xl font-black mb-6 gradient-text">Design Tokens & Typography</h2>
        <div className="grid grid-cols-2 gap-8">
          <GlassContainer>
            <h1 className="text-4xl font-bold mb-2">Heading 1</h1>
            <h2 className="text-3xl font-bold mb-2">Heading 2</h2>
            <h3 className="text-2xl font-bold mb-2">Heading 3</h3>
            <p className="text-base text-slate-400">
              Corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. 
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.
            </p>
          </GlassContainer>
          <GlassContainer variant="subtle">
             <div className="space-y-4">
               <div className="flex items-center gap-4">
                 <div className="w-16 h-16 rounded-2xl bg-[var(--color-brand-primary)] flex items-center justify-center text-xs font-bold text-white">Primary</div>
                 <div className="w-16 h-16 rounded-2xl bg-[var(--color-brand-secondary)] flex items-center justify-center text-xs font-bold text-white">Secondary</div>
                 <div className="w-16 h-16 rounded-2xl bg-[var(--color-brand-accent)] flex items-center justify-center text-xs font-bold text-white">Accent</div>
               </div>
               <div className="flex items-center gap-4">
                 <div className="w-16 h-16 rounded-2xl bg-[var(--color-success)] flex items-center justify-center text-xs font-bold text-white">Success</div>
                 <div className="w-16 h-16 rounded-2xl bg-[var(--color-warning)] flex items-center justify-center text-xs font-bold text-white">Warning</div>
                 <div className="w-16 h-16 rounded-2xl bg-[var(--color-error)] flex items-center justify-center text-xs font-bold text-white">Error</div>
               </div>
             </div>
          </GlassContainer>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-black mb-6 text-white">Glass Components</h2>
        <div className="grid grid-cols-3 gap-6">
          <GlassContainer variant="default" glow hoverEffect>
            <h3 className="font-bold mb-2">Default Glass</h3>
            <p className="text-sm text-slate-400">Backdrop blur 20px, saturated.</p>
          </GlassContainer>
          <GlassContainer variant="elevated" hoverEffect>
            <h3 className="font-bold mb-2">Elevated Glass</h3>
            <p className="text-sm text-slate-400">Higher opacity, deeper blur.</p>
          </GlassContainer>
          <GlassContainer variant="card" hoverEffect>
            <h3 className="font-bold mb-2">Card Glass</h3>
            <p className="text-sm text-slate-400">Subtle gradient overlay.</p>
          </GlassContainer>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-black mb-6 text-white">Interactive Elements</h2>
        <div className="flex flex-wrap gap-4 items-center mb-8">
          <Button variant="primary" icon={<Zap className="w-4 h-4" />}>Primary Action</Button>
          <Button variant="secondary" icon={<ShieldCheck className="w-4 h-4" />}>Secondary</Button>
          <Button variant="danger">Destructive</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="primary" loading>Loading</Button>
        </div>
        
        <div className="max-w-md space-y-4">
          <Input label="Email Address" placeholder="neo@matrix.com" icon={<Activity className="w-4 h-4" />} />
          <Input label="Password" type="password" placeholder="••••••••" error="Neural link unstable" />
        </div>
      </section>
    </div>
  );
};

export default DesignSystemSpec;
