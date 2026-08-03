// AUTO-GENERATED from pulse-protocol-v1 artifacts
// Frozen Baseline: be73488

export const PulseFactoryABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_vaultFactory",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_tradingEngine",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_settlementManager",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_feeManager",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_settlementToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_minInitialLiquidity",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "Factory__AllocationMismatch",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Factory__DurationTooShort",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Factory__EmptyAllocation",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "provided",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minimum",
        "type": "uint256"
      }
    ],
    "name": "Factory__InsufficientInitialLiquidity",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Factory__InvalidFeeRecipient",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Factory__InvalidMetadata",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Factory__InvalidModuleAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Factory__InvalidTimeRange",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Factory__InvalidViewType",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Factory__PermanentViewMustHaveZeroEndTime",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Factory__VaultDeploymentFailed",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "Factory__ViewNotFound",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "SafeERC20FailedOperation",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "feeRecipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "enum IPulseFactory.ViewType",
        "name": "viewType",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "vault",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      }
    ],
    "name": "ViewCreated",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MIN_INITIAL_LIQUIDITY",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MIN_MARKET_DURATION",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MIN_TRADING_DURATION",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "SETTLEMENT_WINDOW",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum IPulseFactory.ViewType",
        "name": "viewType",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "metadataURI",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "metadataHash",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "initialYesLiquidity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "initialNoLiquidity",
        "type": "uint256"
      }
    ],
    "name": "createView",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum IPulseFactory.ViewType",
        "name": "viewType",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "metadataURI",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "metadataHash",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "feeRecipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "totalYesLiquidity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalNoLiquidity",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "yesLiquidity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "noLiquidity",
            "type": "uint256"
          }
        ],
        "internalType": "struct IPulseFactory.LiquidityAllocation[]",
        "name": "allocations",
        "type": "tuple[]"
      }
    ],
    "name": "createViewWithInitialAllocation",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "exists",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "feeManager",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "getFeeConfig",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "totalBps",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "feeRecipientBps",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "treasuryBps",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "teamBps",
            "type": "uint256"
          }
        ],
        "internalType": "struct IPulseFactory.FeeConfig",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "feeRecipient",
        "type": "address"
      }
    ],
    "name": "getFeeRecipientViews",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "viewIds",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "getVault",
    "outputs": [
      {
        "internalType": "address",
        "name": "vault",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "getView",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "viewId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "feeRecipient",
            "type": "address"
          },
          {
            "internalType": "enum IPulseFactory.ViewType",
            "name": "viewType",
            "type": "uint8"
          },
          {
            "internalType": "string",
            "name": "metadataURI",
            "type": "string"
          },
          {
            "internalType": "bytes32",
            "name": "metadataHash",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "startTime",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "endTime",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "vault",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "priceEngine",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "settlementManager",
            "type": "address"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "totalBps",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "feeRecipientBps",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "treasuryBps",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "teamBps",
                "type": "uint256"
              }
            ],
            "internalType": "struct IPulseFactory.FeeConfig",
            "name": "feeConfig",
            "type": "tuple"
          }
        ],
        "internalType": "struct IPulseFactory.ViewRecord",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "settlementManager",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "settlementToken",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalFeeRecipients",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalViews",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tradingEngine",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "vaultFactory",
    "outputs": [
      {
        "internalType": "contract IMarketVaultFactory",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const TradingEngineABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_factory",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_priceEngine",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_feeManager",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "Math__DivisionByZero",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Math__Overflow",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ReentrancyGuardReentrantCall",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "SafeERC20FailedOperation",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TradingEngine__AllocationMismatch",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "TradingEngine__AlreadyInitialised",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "TradingEngine__AlreadyLocked",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TradingEngine__EmptyAllocation",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "currentTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      }
    ],
    "name": "TradingEngine__EndTimeNotReached",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "provided",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minimum",
        "type": "uint256"
      }
    ],
    "name": "TradingEngine__InsufficientInitialLiquidity",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "side",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "requested",
        "type": "uint256"
      }
    ],
    "name": "TradingEngine__InsufficientPosition",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TradingEngine__InvalidAllocationUser",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "TradingEngine__InvalidPriceEngineOutput",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reserve",
        "type": "uint256"
      }
    ],
    "name": "TradingEngine__InvalidReserveBalance",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TradingEngine__InvalidSide",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "internalType": "enum ITradingEngine.MarketStatus",
        "name": "current",
        "type": "uint8"
      }
    ],
    "name": "TradingEngine__InvalidStatus",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "internalType": "enum ITradingEngine.MarketStatus",
        "name": "current",
        "type": "uint8"
      }
    ],
    "name": "TradingEngine__MarketNotActive",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TradingEngine__NotImplemented",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "actual",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minimum",
        "type": "uint256"
      }
    ],
    "name": "TradingEngine__SlippageExceeded",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TradingEngine__UnauthorisedFactory",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TradingEngine__UnauthorisedSettlement",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "TradingEngine__VaultNotFound",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "TradingEngine__ViewNotFound",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TradingEngine__ZeroAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TradingEngine__ZeroAmount",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "trader",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "side",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "sharesOut",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newIndex",
        "type": "uint256"
      }
    ],
    "name": "Bought",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "finalTWAP",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "MarketLocked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum ITradingEngine.MarketStatus",
        "name": "oldStatus",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "enum ITradingEngine.MarketStatus",
        "name": "newStatus",
        "type": "uint8"
      }
    ],
    "name": "MarketStatusChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newIndex",
        "type": "uint256"
      }
    ],
    "name": "PulseIndexUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "trader",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "side",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "sharesIn",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newIndex",
        "type": "uint256"
      }
    ],
    "name": "Sold",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "finalTWAP",
        "type": "uint256"
      }
    ],
    "name": "TWAPFinalised",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "pulseIndex",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "TWAPSnapshotRecorded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "side",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minSharesOut",
        "type": "uint256"
      }
    ],
    "name": "buy",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "sharesOut",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "factory",
    "outputs": [
      {
        "internalType": "contract IPulseFactory",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "feeManager",
    "outputs": [
      {
        "internalType": "contract IFeeManager",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "getFinalTWAP",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "twap",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "getMarketState",
    "outputs": [
      {
        "components": [
          {
            "internalType": "enum ITradingEngine.MarketStatus",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "reserveBalance",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "forSupply",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "againstSupply",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "lastPulseIndex",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "lastTradeTimestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct ITradingEngine.MarketState",
        "name": "state",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "getMarketStatus",
    "outputs": [
      {
        "internalType": "enum ITradingEngine.MarketStatus",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getPosition",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "forShares",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "againstShares",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "claimStatus",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "lastUpdate",
            "type": "uint256"
          }
        ],
        "internalType": "struct ITradingEngine.Position",
        "name": "position",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "getPulseIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "pulseIndex",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "getReserve",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "reserve",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "getSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "forSupply",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "againstSupply",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "getVaultBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalYesLiquidity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalNoLiquidity",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "yesLiquidity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "noLiquidity",
            "type": "uint256"
          }
        ],
        "internalType": "struct IPulseFactory.LiquidityAllocation[]",
        "name": "allocations",
        "type": "tuple[]"
      }
    ],
    "name": "initializeMarketState",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "lockMarket",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "markPositionClaimed",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "marketStates",
    "outputs": [
      {
        "internalType": "enum ITradingEngine.MarketStatus",
        "name": "status",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "reserveBalance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "forSupply",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "againstSupply",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lastPulseIndex",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lastTradeTimestamp",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "positions",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "forShares",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "againstShares",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "claimStatus",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "lastUpdate",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "priceEngine",
    "outputs": [
      {
        "internalType": "contract IPriceEngine",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "side",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "sharesIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minAmountOut",
        "type": "uint256"
      }
    ],
    "name": "sell",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "setStatusClaimable",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "setStatusSettlement",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "twapStates",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "writtenSlotBitmap",
        "type": "uint256"
      },
      {
        "internalType": "uint64",
        "name": "seedBlockNumber",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "endTimeBlock",
        "type": "uint64"
      },
      {
        "internalType": "uint256",
        "name": "lastKnownPulseIndex",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "tStop",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "finalTWAP",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "locked",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const FeeManagerABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_authorizedTradingEngine",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_factory",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_treasury",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_team",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "FeeManager__InvalidFeeRecipient",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "FeeManager__NothingToClaim",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "FeeManager__UnauthorisedCaller",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "FeeManager__VaultNotFound",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "FeeManager__ZeroFee",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ReentrancyGuardReentrantCall",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "feeRecipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "FeeRecipientClaimed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "feeRecipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalFee",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "feeRecipientFee",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "treasuryFee",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "teamFee",
        "type": "uint256"
      }
    ],
    "name": "FeeRecorded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "team",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "TeamFeeClaimed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "treasury",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "TreasuryFeeClaimed",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "BPS_DENOMINATOR",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "FEE_RECIPIENT_SHARE_BPS",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "TEAM_SHARE_BPS",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "TOTAL_FEE_BPS",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "TREASURY_SHARE_BPS",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "authorizedTradingEngine",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "claimFeeRecipientFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "claimTeamFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "claimTreasuryFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "factory",
    "outputs": [
      {
        "internalType": "contract IPulseFactory",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "feeConfig",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "feeRecipientBps",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "treasuryBps",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "teamBps",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalBps",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "feeRecipient",
        "type": "address"
      }
    ],
    "name": "pendingFeeRecipientFees",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "pendingTeamFees",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "pendingTreasuryFees",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "feeRecipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "totalFee",
        "type": "uint256"
      }
    ],
    "name": "recordFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "team",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "treasury",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const SettlementManagerABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_tradingEngine",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_factory",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "Math__DivisionByZero",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Math__Overflow",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ReentrancyGuardReentrantCall",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "Settlement__AlreadyClaimed",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "Settlement__AlreadySettled",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "Settlement__InvalidTWAP",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "Settlement__MarketNotClaimable",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "Settlement__MarketNotLocked",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "Settlement__NoPositionToClaim",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Settlement__ZeroAddress",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum ISettlementManager.SettlementResult",
        "name": "result",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "finalTWAP",
        "type": "uint256"
      }
    ],
    "name": "MarketSettled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "RewardClaimed",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "claimReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "factory",
    "outputs": [
      {
        "internalType": "contract IPulseFactory",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getClaimableAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "getSettlementResult",
    "outputs": [
      {
        "internalType": "enum ISettlementManager.SettlementResult",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "hasClaimed",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      }
    ],
    "name": "settleMarket",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tradingEngine",
    "outputs": [
      {
        "internalType": "contract ITradingEngine",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const MarketVaultABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_viewId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_authorizedTradingEngine",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_authorizedSettlement",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_factory",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "ReentrancyGuardReentrantCall",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "SafeERC20FailedOperation",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "requested",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "available",
        "type": "uint256"
      }
    ],
    "name": "Vault__FeeExceedsRecorded",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Vault__FeeManagerAlreadySet",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Vault__FeeManagerNotSet",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Vault__InsufficientBalance",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Vault__InvalidRecipient",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Vault__InvariantViolation",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Vault__UnauthorisedEngine",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Vault__UnauthorisedFeeManager",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Vault__UnauthorisedSettlement",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Vault__ZeroAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Vault__ZeroAmount",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "caller",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Deposited",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "FeeRecordedNotified",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "FeeReleased",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Settled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "viewId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Withdrawn",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "authorizedFeeManager",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "authorizedSettlementManager",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "authorizedTradingEngine",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "balance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "factory",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "notifyFeeRecorded",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "releaseFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "feeManager",
        "type": "address"
      }
    ],
    "name": "setFeeManager",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "settle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "token",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalDeposits",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalFeesRecorded",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalFeesReleased",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSettled",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalWithdrawals",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "viewId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export const MockUSDTABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "allowance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      }
    ],
    "name": "ERC20InsufficientAllowance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      }
    ],
    "name": "ERC20InsufficientBalance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "approver",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidApprover",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidReceiver",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidSender",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidSpender",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

