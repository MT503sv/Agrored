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

type CreateContractPayload = {
  product: string;
  total: number;
  deadline: string;
  price?: string;
  notes?: string;
};

const initialContracts: Contract[] = [
  {
    id: 1,
    product: "Tomatoes",
    total: 100,
    covered: 40,
    deadline: "2025-09-20",
    price: "$12 / box",
    contributors: [{ name: "Producer A", qty: 40 }],
    creator: "You",
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
    creator: "You",
    notes: "Fresh",
  },
];

export default function AgreementBuyer() {
  const [view, setView] = useState<"Create" | "MyAgreements">("MyAgreements");
  const [contracts, setContracts] = useState<Contract[]>(initialContracts);

  const currentUser = "You";

  const myContracts = contracts.filter((c) => c.creator === currentUser);

  const createContract = (payload: CreateContractPayload) => {
    const newId =
      contracts.length > 0
        ? Math.max(...contracts.map((c) => c.id)) + 1
        : 1;

    const newContract: Contract = {
      id: newId,
      covered: 0,
      contributors: [],
      creator: currentUser,
      status: "open",
      price: payload.price || "To be defined",
      ...payload,
    };

    setContracts([...contracts, newContract]);
    setView("MyAgreements");
  };

  return (
    <div
      className="min-h-screen bg-gray-50 text-gray-900"
      style={{ "--agro-green": "#55A605" } as React.CSSProperties}
    >
      <header className="sticky top-0 bg-gray-50 z-20 py-4">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Agreements
          </h1>

          <nav className="flex gap-2">
            {["Create", "MyAgreements"].map((v) => (
              <button
                key={v}
                onClick={() =>
                  setView(v as "Create" | "MyAgreements")
                }
                className={`px-4 py-2 rounded-md font-medium ${
                  view === v
                    ? "bg-[var(--agro-green)] text-white"
                    : "bg-white shadow hover:shadow-lg"
                }`}
              >
                {v}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 space-y-6">
        {view === "MyAgreements" && (
          <ContractsList contracts={myContracts} />
        )}

        {view === "Create" && (
          <CreateContractForm onCreate={createContract} />
        )}
      </main>
    </div>
  );
}

type ContractsListProps = {
  contracts: Contract[];
};

const ContractsList: React.FC<ContractsListProps> = ({
  contracts,
}) => (
  <section>
    <h2 className="text-xl font-semibold mb-4">
      My Agreements
    </h2>

    {contracts.length === 0 ? (
      <div className="p-6 rounded-xl bg-white shadow-lg">
        You have not created any agreements yet.
      </div>
    ) : (
      <div className="grid gap-4 md:grid-cols-2">
        {contracts.map((c) => (
          <article
            key={c.id}
            className="p-4 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">
                  {c.product}
                </h3>
                <p className="text-sm text-gray-600">
                  {c.total} boxes • Price: {c.price}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Deadline: {c.deadline}
                </p>
                {c.notes && (
                  <p className="text-sm text-gray-500 mt-1">
                    Notes: {c.notes}
                  </p>
                )}
              </div>

              <div className="text-right">
                <p className="text-sm">
                  {c.covered}/{c.total}
                </p>
                <div className="text-xs mt-2">
                  {c.status || "Open"}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      (c.covered / c.total) * 100
                    )}%`,
                    background:
                      "linear-gradient(90deg,var(--agro-green),#059669)",
                  }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    )}
  </section>
);

type CreateContractFormProps = {
  onCreate: (payload: CreateContractPayload) => void;
};

const CreateContractForm: React.FC<
  CreateContractFormProps
> = ({ onCreate }) => {
  const [product, setProduct] = useState("");
  const [total, setTotal] = useState(100);
  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!product || !total || !deadline) return;

    onCreate({ product, total, deadline, notes });

    setProduct("");
    setTotal(100);
    setDeadline("");
    setNotes("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded-xl bg-white shadow-lg max-w-2xl mx-auto space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        Create New Agreement
      </h2>

      <input
        type="text"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        placeholder="Product"
        className="w-full p-3 border rounded-lg"
      />

      <input
        type="number"
        value={total}
        onChange={(e) => setTotal(Number(e.target.value))}
        className="w-full p-3 border rounded-lg"
      />

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="w-full p-3 border rounded-lg"
      />

      <input
        type="text"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes"
        className="w-full p-3 border rounded-lg"
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white p-3 rounded-lg"
      >
        Create
      </button>
    </form>
  );
};