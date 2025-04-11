
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key } from "lucide-react";

type ApiKeyFormProps = {
  onApiKeySubmit: (apiKey: string) => void;
  isApiKeySet: boolean;
};

const ApiKeyForm = ({ onApiKeySubmit, isApiKeySet }: ApiKeyFormProps) => {
  const [apiKey, setApiKey] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={isApiKeySet ? "outline" : "default"} size="sm">
          <Key className="w-4 h-4 mr-2" />
          {isApiKeySet ? "API Key Set" : "Set API Key"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set OpenAI API Key</DialogTitle>
          <DialogDescription>
            Enter your OpenAI API key to enable the AI trip planning functionality.
            Your key is only stored locally and never sent to our servers.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={!apiKey.trim()}>
              Save API Key
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyForm;
