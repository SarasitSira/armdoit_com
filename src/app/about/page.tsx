import Link from "next/link";
import { ArrowRight, Mail, MapPin, Building2, Wrench } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container max-w-screen-xl px-4 md:px-8 mx-auto py-12 space-y-16">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">System.Info</h1>
        <p className="text-xl text-muted-foreground font-mono uppercase tracking-widest border-b border-border pb-8">
          ENTREPRENEUR || ROBOTICS ENGINEER
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold uppercase tracking-tight">[MISSION]</h2>
          <p className="text-muted-foreground leading-relaxed">
            I am a robotics engineer passionate about bridging the gap between digital design and physical reality. My focus lies in wearble robotics.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            
          </p>
          
          <div className="pt-6 flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-mono text-sm tracking-widest hover:opacity-90 transition-opacity uppercase font-bold">
              [GET_IN_TOUCH] <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="/resume.pdf" download className="inline-flex items-center justify-center gap-2 border border-border bg-background hover:bg-muted px-6 py-3 rounded-md font-mono text-sm tracking-widest uppercase transition-colors font-bold text-foreground">
              [RESUME]
            </a>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-6">[TECHNICAL_SPECS]</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-sm">
              <div className="p-4 border border-border bg-card flex items-start gap-4">
                <Wrench className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <div className="text-muted-foreground mb-1">SOFTWARE</div>
                  <ul className="space-y-1">
                    <li>SolidWorks</li>
                    <li>OnShape</li>
                    <li>Fusion 360</li>
                    <li>KiCAD</li>
                    <li>ANSYS</li>
                    <li>MATLAB/C++/Python</li>
                    <li>WebDev</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 border border-border bg-card flex items-start gap-4">
                <Building2 className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <div className="text-muted-foreground mb-1">MANUFACTURING</div>
                  <ul className="space-y-1">
                    <li>3D Printing</li>
                    <li>Machining</li>
                    <li>Laser Cutting</li>
                    <li>Soldering</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border border-border bg-muted/30">
            <h3 className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-4">Current Coordinates</h3>
            <div className="flex items-center gap-2 font-mono">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Atlanta, GA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
