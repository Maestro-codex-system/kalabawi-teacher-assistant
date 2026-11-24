import { DocumentViewerSection, ProgressBarSection } from "./document";
import {
  ColorsSection,
  PrinciplesPanel,
  RadiusSection,
  SpacingSection,
  SpacingSystemPanel,
  TypographySection,
} from "./foundations";
import {
  ButtonsSection,
  ComponentsSection,
  IconographySection,
  ToastsSection,
} from "./library";
import { MascotReactionsSection } from "./reactions";
import { SiteHeader } from "./site-header";

export function DesignSystemBoard() {
  return (
    <main className="min-h-dvh bg-canvas">
      <SiteHeader />

      <div className="mx-auto w-full max-w-[1180px] px-4 pb-12 pt-6 sm:px-6 lg:pt-7">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.42fr)_minmax(0,1fr)] lg:gap-5">
          <ColorsSection />
          <TypographySection />
          <SpacingSection />
          <RadiusSection />
          <SpacingSystemPanel />
          <PrinciplesPanel />
          <IconographySection />
          <ButtonsSection />
          <ToastsSection />
          <ComponentsSection />
        </div>

        <div className="mt-4 space-y-4 lg:mt-5 lg:space-y-5">
          <DocumentViewerSection />
          <ProgressBarSection />
          <MascotReactionsSection />
        </div>
      </div>
    </main>
  );
}
