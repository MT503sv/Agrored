'use client';

import React, { useState } from "react";

type Contributor = { name: string; qty: number };

type Contract = {
  id: number;
  product: string;
  total: number;
  covered: number;
  deadline: string;
  price: string;
  contributors: Contributor[];
  creator: string;
  status?: string;
  notes?: string;
};

export default function AgreementSellerPage() {
  const initialContracts: Contract[] = [
    {
      id: 1,
      product: "Tomatoes",
      total: 100,
      covered: 40,
      deadline: "2025-09-20",
      price: "$12 / box",
      contributors: [{ name: "Producer A", qty: 40 }],
      creator: "Admin",
      notes: "Organic only",
    },
    {
      id: 2,
      product: "Chilies",
      total: 50,
      covered: 20,
      deadline: "2025-09-18",
      price: "$8 / box",
      contributors: [{ name: "Producer B", qty: 20 }],
      creator: "Admin",
      notes: "Fresh",
    },
  ];

  const [view, setView] = useState<"available" | "MyAgreements">("available");
  const [contracts, setContracts] = useState<Contract[]>(initialContracts);
  const [selected, setSelected] = useState<Contract | null>(null);
  const [showJoin, setShowJoin] = useState(false);

  const currentUser = "You";

  const availableContracts = contracts.filter(
    (c) => c.creator !== currentUser && c.covered < c.total
  );

  const myContracts = contracts.filter(
    (c) =>
      c.creator === currentUser ||
      c.contributors.some((con) => con.name === currentUser)
  );

  const joinContract = (id: number, qty: number) => {
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;

        const available = c.total - c.covered;
        const add = Math.min(available, qty);

        if (add <= 0) return c;

        const newCovered = c.covered + add;

        return {
          ...c,
          covered: newCovered,
          contributors: [...c.contributors, { name: currentUser, qty: add }],
          status: newCovered >= c.total ? "Completed" : "In Progress",
        };
      })
    );

    setShowJoin(false);
    setSelected(null);
  };

  const ContractsList: React.FC<{
    contracts: Contract[];
    onJoin?: (c: Contract) => void;
  }> = ({ contracts, onJoin }) => (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        Contracts
      </h2>

      {contracts.length === 0 ? (
        <div className="p-6 rounded-xl bg-white shadow-md text-gray-800">
          No contracts found.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {contracts.map((c) => (
            <article
              key={c.id}
              className="p-5 rounded-xl bg-white shadow-md hover:shadow-lg space-y-2"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {c.product}
                  </h3>

                  <p className="text-sm text-gray-800">
                    {c.total} boxes • {c.price}
                  </p>

                  <p className="text-sm text-gray-700">
                    Deadline: {c.deadline}
                  </p>

                  {c.notes && (
                    <p className="text-sm text-gray-700">
                      {c.notes}
                    </p>
                  )}
                </div>

                <div className="text-right text-sm text-gray-900">
                  <p>
                    {c.covered}/{c.total}
                  </p>
                  <p>{c.status || "Open"}</p>
                </div>
              </div>

              {onJoin && (
                <div className="mt-3 text-right">
                  <button
                    onClick={() => onJoin(c)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Join
                  </button>
                </div>
              )}

              <div className="mt-3 bg-gray-200 h-2 rounded">
                <div
                  className="h-2 bg-green-600 rounded"
                  style={{
                    width: `${Math.min(
                      100,
                      (c.covered / c.total) * 100
                    )}%`,
                  }}
                />
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );

  const JoinForm: React.FC<{
    contract: Contract;
    onConfirm: (id: number, qty: number) => void;
    onCancel: () => void;
  }> = ({ contract, onConfirm, onCancel }) => {
    const [qty, setQty] = useState(1);

    return (
      <div className="mt-6 p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto space-y-4">
        <h3 className="font-bold text-lg text-gray-900">
          Join Contract
        </h3>

        <p className="text-gray-800">
          Available: {contract.total - contract.covered}
        </p>

        <input
          type="number"
          min={1}
          max={contract.total - contract.covered}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          className="p-3 w-full rounded-lg bg-white text-black placeholder-gray-500 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="flex gap-3">
          <button
            onClick={() => onConfirm(contract.id, qty)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full"
          >
            Confirm
          </button>

          <button
            onClick={onCancel}
            className="w-full px-4 py-2 rounded-lg bg-gray-300 text-black hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Agreements
        </h1>

        <div className="flex gap-2">
          <button
            onClick={() => setView("available")}
            className={`px-4 py-2 rounded-lg ${
              view === "available"
                ? "bg-green-600 text-white"
                : "bg-white shadow text-black"
            }`}
          >
            Available
          </button>

          <button
            onClick={() => setView("MyAgreements")}
            className={`px-4 py-2 rounded-lg ${
              view === "MyAgreements"
                ? "bg-green-600 text-white"
                : "bg-white shadow text-black"
            }`}
          >
            My Agreements
          </button>
        </div>
      </header>

      {view === "available" && (
        <ContractsList
          contracts={availableContracts}
          onJoin={(c) => {
            setSelected(c);
            setShowJoin(true);
          }}
        />
      )}

      {view === "MyAgreements" && (
        <ContractsList contracts={myContracts} />
      )}

      {selected && showJoin && (
        <JoinForm
          contract={selected}
          onConfirm={joinContract}
          onCancel={() => setShowJoin(false)}
        />
      )}
    </div>
  );
}