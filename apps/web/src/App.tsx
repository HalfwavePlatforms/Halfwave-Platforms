import React from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { Button } from './components/Button';

export const App: React.FC = () => {
  const colors = [
    { name: '--bg', value: 'var(--bg)' },
    { name: '--bg-elevated', value: 'var(--bg-elevated)' },
    { name: '--bg-subtle', value: 'var(--bg-subtle)' },
    { name: '--bg-glass', value: 'var(--bg-glass)' },
    { name: '--text', value: 'var(--text)' },
    { name: '--text-muted', value: 'var(--text-muted)' },
    { name: '--text-inverse', value: 'var(--text-inverse)' },
    { name: '--border-subtle', value: 'var(--border-subtle)' },
    { name: '--border-strong', value: 'var(--border-strong)' },
    { name: '--accent', value: 'var(--accent)' },
    { name: '--accent-hover', value: 'var(--accent-hover)' },
    { name: '--accent-soft', value: 'var(--accent-soft)' },
    { name: '--accent-text', value: 'var(--accent-text)' },
    { name: '--success', value: 'var(--success)' },
    { name: '--warning', value: 'var(--warning)' },
    { name: '--danger', value: 'var(--danger)' },
    { name: '--focus-ring', value: 'var(--focus-ring)' },
  ];

  const typeScale = [
    {
      token: '--fs-display',
      label: 'Display Type',
      sample: 'Halfwave Platforms',
    },
    {
      token: '--fs-h1',
      label: 'Heading 1',
      sample: 'Engineering Digital Growth',
    },
    {
      token: '--fs-h2',
      label: 'Heading 2',
      sample: 'Scalable Enterprise Solutions',
    },
    {
      token: '--fs-h3',
      label: 'Heading 3',
      sample: 'AI & Machine Learning Core',
    },
    {
      token: '--fs-body',
      label: 'Body Text',
      sample:
        'Standard body typography with high legibility and balanced spacing.',
    },
    {
      token: '--fs-small',
      label: 'Small Text',
      sample:
        'Secondary metadata, captions, and fine technical specifications.',
    },
    {
      token: '--fs-label',
      label: 'Label / Mono',
      sample: 'PHASE 01 // PRODUCTION SPECIFICATION',
    },
  ];

  const spacing = [
    { token: '--space-1', px: '4px' },
    { token: '--space-2', px: '8px' },
    { token: '--space-3', px: '12px' },
    { token: '--space-4', px: '16px' },
    { token: '--space-5', px: '20px' },
    { token: '--space-6', px: '24px' },
    { token: '--space-7', px: '28px' },
    { token: '--space-8', px: '32px' },
    { token: '--space-9', px: '36px' },
    { token: '--space-10', px: '40px' },
    { token: '--space-11', px: '44px' },
    { token: '--space-12', px: '48px' },
  ];

  const radii = [
    {
      token: '--radius-sm',
      value: 'var(--radius-sm)',
      label: '12px (Cards & inputs)',
    },
    {
      token: '--radius-md',
      value: 'var(--radius-md)',
      label: '20px (Modal surfaces)',
    },
    {
      token: '--radius-lg',
      value: 'var(--radius-lg)',
      label: '28px (Hero feature tiles)',
    },
    {
      token: '--radius-pill',
      value: 'var(--radius-pill)',
      label: '999px (Buttons & badges)',
    },
  ];

  const shadows = [
    {
      token: '--shadow-sm',
      value: 'var(--shadow-sm)',
      label: 'Subtle Hairline Elevation',
    },
    {
      token: '--shadow-md',
      value: 'var(--shadow-md)',
      label: 'Card Hover / Popover Elevation',
    },
    {
      token: '--shadow-lg',
      value: 'var(--shadow-lg)',
      label: 'Floating Modal / Nav Elevation',
    },
  ];

  return (
    <div
      className="container"
      style={{
        paddingTop: 'var(--space-4)',
        paddingBottom: 'var(--space-12)',
      }}
    >
      {/* Task 4: Sticky Test Bar */}
      <div
        id="sticky-test-bar"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'var(--bg-glass)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: 'var(--space-3) var(--space-4)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-6)',
          borderRadius: 'var(--radius-sm)',
        }}
      >
        <span
          style={{
            fontSize: 'var(--fs-small)',
            fontWeight: 600,
            color: 'var(--accent-text)',
          }}
        >
          Sticky Test Bar (position: sticky; top: 0)
        </span>
        <span
          style={{
            fontSize: 'var(--fs-label)',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          Overflow: body overflow-x: clip (sticky verified)
        </span>
      </div>

      {/* Top Meta Bar */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--space-6)',
          marginBottom: 'var(--space-8)',
        }}
      >
        <div>
          <span className="eyebrow" style={{ marginBottom: 'var(--space-2)' }}>
            Design System Foundation
          </span>
          <h1>Halfwave Design Tokens</h1>
          <p
            style={{
              color: 'var(--text-muted)',
              marginTop: 'var(--space-2)',
            }}
          >
            Style guide (temporary, removed in Step 3)
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-4)',
          }}
        >
          <ThemeToggle />
        </div>
      </header>

      {/* 1. Color Swatches */}
      <section className="section">
        <h2 style={{ marginBottom: 'var(--space-4)' }}>1. Color Tokens</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          {colors.map((c) => (
            <div
              key={c.name}
              style={{
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-elevated)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                style={{
                  height: '72px',
                  backgroundColor: c.value,
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              />
              <div style={{ padding: 'var(--space-3)' }}>
                <code
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--fs-label)',
                    fontWeight: 600,
                  }}
                >
                  {c.name}
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Typography Scale */}
      <section className="section">
        <h2 style={{ marginBottom: 'var(--space-4)' }}>2. Typography Scale</h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)',
            backgroundColor: 'var(--bg-elevated)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {typeScale.map((t) => (
            <div
              key={t.token}
              style={{
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: 'var(--space-4)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-2)',
                }}
              >
                <code
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--fs-small)',
                    color: 'var(--accent-text)',
                  }}
                >
                  {t.token}
                </code>
                <span
                  style={{
                    fontSize: 'var(--fs-small)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {t.label}
                </span>
              </div>
              <div
                style={{
                  fontSize: `var(${t.token})`,
                  fontWeight:
                    t.token.includes('display') || t.token.includes('h')
                      ? 700
                      : 400,
                }}
              >
                {t.sample}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Spacing Scale */}
      <section className="section">
        <h2 style={{ marginBottom: 'var(--space-4)' }}>3. Spacing Scale</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: 'var(--space-3)',
          }}
        >
          {spacing.map((s) => (
            <div
              key={s.token}
              style={{
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: 'var(--space-3)',
              }}
            >
              <code
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--fs-label)',
                }}
              >
                {s.token}
              </code>
              <div
                style={{
                  fontSize: 'var(--fs-small)',
                  color: 'var(--text-muted)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                {s.px}
              </div>
              <div
                style={{
                  height: '8px',
                  width: `var(${s.token})`,
                  backgroundColor: 'var(--accent)',
                  borderRadius: '2px',
                  maxWidth: '100%',
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Radii Scale */}
      <section className="section">
        <h2 style={{ marginBottom: 'var(--space-4)' }}>4. Border Radii</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          {radii.map((r) => (
            <div
              key={r.token}
              style={{
                height: '110px',
                borderRadius: r.value,
                backgroundColor: 'var(--bg-elevated)',
                border: '2px solid var(--border-strong)',
                padding: 'var(--space-4)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <code
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--fs-small)',
                  fontWeight: 600,
                }}
              >
                {r.token}
              </code>
              <span
                style={{
                  fontSize: 'var(--fs-small)',
                  color: 'var(--text-muted)',
                  marginTop: 'var(--space-1)',
                }}
              >
                {r.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Shadows */}
      <section className="section">
        <h2 style={{ marginBottom: 'var(--space-4)' }}>5. Elevation Shadows</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {shadows.map((sh) => (
            <div
              key={sh.token}
              style={{
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                boxShadow: sh.value,
              }}
            >
              <code
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--fs-small)',
                  fontWeight: 600,
                }}
              >
                {sh.token}
              </code>
              <p
                style={{
                  marginTop: 'var(--space-2)',
                  fontSize: 'var(--fs-small)',
                  color: 'var(--text-muted)',
                }}
              >
                {sh.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Button Component Matrix */}
      <section className="section">
        <h2 style={{ marginBottom: 'var(--space-4)' }}>
          6. Reusable Button Component
        </h2>
        <div
          style={{
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)',
          }}
        >
          <div>
            <h3
              style={{
                fontSize: 'var(--fs-h3)',
                marginBottom: 'var(--space-3)',
              }}
            >
              Primary Variant
            </h3>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-4)',
                alignItems: 'center',
              }}
            >
              <Button variant="primary" size="md">
                Primary (md)
              </Button>
              <Button variant="primary" size="lg">
                Primary (lg)
              </Button>
              <Button
                variant="primary"
                size="md"
                iconRight={<span aria-hidden="true">&rarr;</span>}
              >
                With Icon
              </Button>
              <Button variant="primary" size="md" disabled>
                Disabled
              </Button>
              <Button variant="primary" size="md" loading>
                Loading
              </Button>
              <Button variant="primary" size="md" as="a" href="#contact">
                As Link
              </Button>
            </div>
          </div>

          <div>
            <h3
              style={{
                fontSize: 'var(--fs-h3)',
                marginBottom: 'var(--space-3)',
              }}
            >
              Secondary Variant
            </h3>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-4)',
                alignItems: 'center',
              }}
            >
              <Button variant="secondary" size="md">
                Secondary (md)
              </Button>
              <Button variant="secondary" size="lg">
                Secondary (lg)
              </Button>
              <Button variant="secondary" size="md" disabled>
                Disabled
              </Button>
              <Button variant="secondary" size="md" loading>
                Loading
              </Button>
            </div>
          </div>

          <div>
            <h3
              style={{
                fontSize: 'var(--fs-h3)',
                marginBottom: 'var(--space-3)',
              }}
            >
              Ghost Variant
            </h3>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-4)',
                alignItems: 'center',
              }}
            >
              <Button variant="ghost" size="md">
                Ghost (md)
              </Button>
              <Button variant="ghost" size="lg">
                Ghost (lg)
              </Button>
              <Button variant="ghost" size="md" disabled>
                Disabled
              </Button>
              <Button variant="ghost" size="md" loading>
                Loading
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
